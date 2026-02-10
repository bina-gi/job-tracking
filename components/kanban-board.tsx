"use client";

import { Board, Column } from "@/lib/models/models.types";
import { CheckCircle2, Calendar, Mic, Award, XCircle } from "lucide-react";
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";

interface KanbanBoardprops {
  board: Board;
  userId: string;
}
interface colConfig {
  color: string;
  icon: ReactNode;
}

const COLUMN_CONFIG: Array<colConfig> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
];

function DroppableColumn({
  column,
  config,
  boardId,
}: {
  column: Column;
  config: colConfig;
  boardId: string;
}) {
  return (
    <Card>
      <CardHeader className={`${config.color}`}>
        <div>
          <div>
            {config.icon}
            <CardTitle>{column.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default function KanbanBoard({ board, userId }: KanbanBoardprops) {
  const columns = board.columns;
  return (
    <div>
      <div>
        {columns.map((col, key) => {
          const config = COLUMN_CONFIG[key] || {
            color: "bg-gray-500",
            icon: <Calendar />,
          };

          return (
            <DroppableColumn
              key={key}
              column={col}
              config={config}
              boardId={board._id}
            />
          );
        })}
      </div>
    </div>
  );
}
