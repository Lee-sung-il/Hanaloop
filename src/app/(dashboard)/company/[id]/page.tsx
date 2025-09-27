"use client";

import {useState} from "react";
import {useParams} from "next/navigation";
import {useCompany} from "@/hooks/useCompany";
import {usePosts} from "@/hooks/usePosts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import PostEditor from "@/components/post-editor";

export default function CompanyDetailPage() {
    const [selectedMonthForEdit, setSelectedMonthForEdit] = useState<string | null>(null);

    const params = useParams();
    const id = params.id as string;

    const {data: company, isLoading: isLoadingCompany} = useCompany(id);
    const {data: posts, isLoading: isLoadingPosts} = usePosts(id);

    const isLoading = isLoadingCompany || isLoadingPosts;

    if (isLoading) {
        return <div>Loading company details...</div>;
    }

    if (!company) {
        return <div>Company not found.</div>;
    }

    return (
        <div>
            {/* 다크 모드 텍스트 색상 추가 */}
            <h1 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{company.name} Details</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
                Detailed emissions data for {company.name} ({company.country}).
            </p>

            <Card>
                <CardHeader>
                    <CardTitle>Monthly Emissions & Reports</CardTitle>
                    <CardDescription>
                        Click button to add or view a report for each month.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul>
                        {company.emissions.map((emission) => {
                            const post = posts?.find(
                                (p) =>
                                    p.resourceUid === company.id && p.dateTime === emission.yearMonth
                            );

                            return (
                                <li
                                    key={emission.yearMonth}
                                    className="flex justify-between items-center py-3 border-b dark:border-slate-800"
                                >
                                    <div>
                                        {/* 다크 모드 텍스트 색상 추가 */}
                                        <span
                                            className="font-medium text-slate-700 dark:text-slate-300">{emission.yearMonth}</span>
                                        <span
                                            className="text-sm text-gray-500 dark:text-gray-400 ml-2">({emission.source})</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {/* 다크 모드 텍스트 색상 추가 */}
                                        <span
                                            className="font-bold text-lg text-slate-800 dark:text-slate-200">{emission.emissions}t</span>
                                        <Dialog
                                            open={selectedMonthForEdit === emission.yearMonth}
                                            onOpenChange={(isOpen) => {
                                                if (!isOpen) {
                                                    setSelectedMonthForEdit(null);
                                                }
                                            }}
                                        >
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant={post ? "outline" : "secondary"}
                                                    onClick={() => setSelectedMonthForEdit(emission.yearMonth)}
                                                >
                                                    {post ? "View/Edit Note" : "Add Note"}
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Report for {emission.yearMonth}</DialogTitle>
                                                </DialogHeader>
                                                <PostEditor
                                                    companyId={company.id}
                                                    yearMonth={emission.yearMonth}
                                                    existingPost={post}
                                                    onSave={() => setSelectedMonthForEdit(null)}
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
