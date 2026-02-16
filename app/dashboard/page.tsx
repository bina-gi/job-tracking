// app/dashboard/page.tsx
import KanbanBoard from "@/components/kanban-board";
import { getSession } from "@/lib/auth/auth";
import { initializeUserBoard } from "@/lib/init-user-board";
import { redirect } from "next/navigation";

async function Dashboard() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  try {
    // This will either get existing board or create a new one
    const board = await initializeUserBoard(session.user.id);
    
    console.log("Board loaded/created:", board?._id);
    console.log("Board columns:", board?.columns);

    // If for some reason board is still null (shouldn't happen with our utility)
    if (!board) {
      return (
        <div className="min-h-screen bg-white">
          <div className="container mx-auto p-6">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold text-black mb-4">No Board Found</h1>
              <p className="text-gray-600 mb-8">
                We couldnt find or create your job board. Please try again.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Ensure board has columns
    if (!board.columns || board.columns.length === 0) {
      return (
        <div className="min-h-screen bg-white">
          <div className="container mx-auto p-6">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold text-black mb-4">Board Configuration Issue</h1>
              <p className="text-gray-600 mb-8">
                Your board doesnt have any columns configured. Please contact support.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-black">{board.name}</h1>
            <p className="text-gray-600">Track your job applications</p>
          </div>
          <KanbanBoard
            board={JSON.parse(JSON.stringify(board))}
            userId={session.user.id}
          />
        </div>
      </div>
    );
    
  } catch (error) {
    console.error("Error in dashboard:", error);
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-black mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-8">
              We couldnt load your dashboard. Please try again.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;