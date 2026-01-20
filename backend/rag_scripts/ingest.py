import os
import time
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore

# Load environment variables
load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "common-medicinal-plants-vana")

def setup_pinecone():
    """Initializes Pinecone client and creates index if it doesn't exist."""
    pc = Pinecone(api_key=PINECONE_API_KEY)
    
    # Check if index exists
    existing_indexes = [index.name for index in pc.list_indexes()]
    
    if PINECONE_INDEX_NAME in existing_indexes:
        print(f"Index {PINECONE_INDEX_NAME} exists. Deleting to ensure clean ingestion...")
        pc.delete_index(PINECONE_INDEX_NAME)
        time.sleep(5)  # Wait for deletion to propagate

    if PINECONE_INDEX_NAME not in [index.name for index in pc.list_indexes()]:
        print(f"Creating index: {PINECONE_INDEX_NAME}")
        # Dimension 384 is for all-MiniLM-L6-v2
        pc.create_index(
            name=PINECONE_INDEX_NAME,
            dimension=384, 
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
        # Wait for index to be ready
        while not pc.describe_index(PINECONE_INDEX_NAME).status['ready']:
            time.sleep(1)
            
    return pc

def ingest_pdf(pdf_path):
    if not os.path.exists(pdf_path):
        print(f"Error: File not found at {pdf_path}")
        return

    print("Loading PDF...")
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    print(f"Loaded {len(documents)} pages.")

    print("Splitting text...")
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    docs = text_splitter.split_documents(documents)
    print(f"Created {len(docs)} chunks before filtering.")

    # Filter chunks based on keywords
    IMPORTANT_KEYWORDS = [
        "use", "used", "useful",
        "treat", "treats", "treatment",
        "medicine", "medicinal",
        "benefit", "benefits",
        "therapy", "therapeutic",
        "indicated", "helps",
        "parts used", "uses", "description", "General description", "food", "recipes"
    ]

    filtered_docs = []
    print("Filtering chunks based on keywords...")
    for doc in docs:
        content_lower = doc.page_content.lower()
        if any(keyword.lower() in content_lower for keyword in IMPORTANT_KEYWORDS):
            filtered_docs.append(doc)

    print(f"Kept {len(filtered_docs)} chunks after filtering (removed {len(docs) - len(filtered_docs)}).")
    docs = filtered_docs

    print("Initializing Embeddings (this downloads the model locally)...")
    # This will download 'sentence-transformers/all-MiniLM-L6-v2' to your local cache
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    print("Upserting to Pinecone...")
    # Initialize Pinecone
    setup_pinecone()
    
    # Batch upsert via LangChain wrapper
    PineconeVectorStore.from_documents(
        docs, 
        embeddings, 
        index_name=PINECONE_INDEX_NAME
    )
    print("Ingestion complete!")

if __name__ == "__main__":
    pdf_file = "Common_Medicinal_Plants.pdf"
    ingest_pdf(pdf_file)
