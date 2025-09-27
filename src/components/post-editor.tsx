"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdatePost } from "@/lib/api";
import { Post } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters."),
    content: z.string().min(10, "Content must be at least 10 characters."),
});

interface PostEditorProps {
    companyId: string;
    yearMonth: string;
    existingPost?: Post;
    onSave: () => void;
}

export default function PostEditor({ companyId, yearMonth, existingPost, onSave }: PostEditorProps) {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: existingPost?.title || "",
            content: existingPost?.content || "",
        },
    });

    const mutation = useMutation({
        mutationFn: createOrUpdatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts", companyId] });
            onSave();
        },
        onError: (error) => {
            alert(error.message);
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate({
            id: existingPost?.id,
            resourceUid: companyId,
            dateTime: yearMonth,
            ...values,
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl><Input placeholder="Monthly Report Title" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl><Textarea placeholder="Write a brief summary..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Saving..." : "Save Post"}
                </Button>
            </form>
        </Form>
    );
}