"use client";

import { Board, Column } from "@/lib/models/models.types";
import {
  CheckCircle2,
  Calendar,
  Mic,
  Award,
  XCircle,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateApplicationJobDialog from "./create-job-dialog";

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
    color: "bg-sky-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-orange-500",
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
    <Card className="min-w-75 shrink-0 shadow-md p-0">
      <CardHeader
        className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-white text-base font-semibold">
              {column.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <MoreVertical  className="h-4 w-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive">
                <Trash2 /> Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 bg-gray-50/50 min-h-100 rounded-b-lg">

<CreateApplicationJobDialog columanId={column._id} boardId={boardId}/>
      </CardContent>
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
