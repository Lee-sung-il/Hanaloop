"use client";

import { useState } from "react";
import type { GhgEmission, Post } from "@/lib/types"; // 프로젝트의 타입 경로에 맞게 수정
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import PostEditor from "@/components/post-editor";

interface EmissionListItemProps {
    companyId: string;
    emission: GhgEmission;
    post: Post | undefined;
}

export default function EmissionListItem({
                                             companyId,
                                             emission,
                                             post,
                                         }: EmissionListItemProps) {
    // ✅ 각 아이템이 자신의 Dialog 상태를 독립적으로 관리합니다.
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <li className="flex justify-between items-center py-3 border-b dark:border-slate-800">
            <div>
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {emission.yearMonth}
        </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
          ({emission.source})
        </span>
            </div>
            <div className="flex items-center gap-4">
        <span className="font-bold text-lg text-slate-800 dark:text-slate-200">
          {emission.emissions}t
        </span>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant={post ? "outline" : "secondary"}>
                            {post ? "View/Edit Note" : "Add Note"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Report for {emission.yearMonth}</DialogTitle>
                        </DialogHeader>
                        <PostEditor
                            companyId={companyId}
                            yearMonth={emission.yearMonth}
                            existingPost={post}
                            onSave={() => setIsDialogOpen(false)} // 저장 후 Dialog를 닫습니다.
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </li>
    );
}