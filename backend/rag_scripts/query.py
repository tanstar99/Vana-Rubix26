import os
import sys
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore

# Load environment variables
load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "common-medicinal-plants-vana")

def query_rag(question):
    print("Initializing Embeddings...")
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    print("Connecting to Pinecone...")
    docsearch = PineconeVectorStore.from_existing_index(
        index_name=PINECONE_INDEX_NAME, 
        embedding=embeddings
    )

    print(f"Searching for: {question}")
    docs = docsearch.similarity_search(question, k=3)

    print("\nResults:")
    for i, doc in enumerate(docs):
        print(f"\n--- Result {i+1} ---")
        print(doc.page_content)
        print(f"[Source: Page {doc.metadata.get('page', 'Unknown')}]")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_question = " ".join(sys.argv[1:])
    else:
        user_question = "What are the medicinal properties of Tulsi?"
    
    query_rag(user_question)
