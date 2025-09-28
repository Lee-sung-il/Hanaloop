'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddCompany } from '@/hooks/useCompanies';
import type { Company } from '@/lib/types';

interface AddCompanyModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function AddCompanyModal({ isOpen, onOpenChange }: AddCompanyModalProps) {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');

    const { mutate: addCompany, isPending } = useAddCompany();

    const handleSubmit = () => {
        if (!name || !country) {
            toast.error('회사 이름과 국가를 모두 입력해주세요.');
            return;
        }

        const newCompanyData: Omit<Company, 'id' | 'emissions'> = { name, country: country.toUpperCase() };

        addCompany(newCompanyData, {
            onSuccess: () => {
                toast.success(`'${name}' 회사가 추가되었습니다!`);
                onOpenChange(false); // 모달 닫기
                setName('');       // 폼 초기화
                setCountry('');    // 폼 초기화
            },
            onError: (error) => {
                toast.error(`오류가 발생했습니다: ${error.message}`);
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>새로운 회사 추가</DialogTitle>
                    <DialogDescription>
                        관리할 새로운 회사의 정보를 입력하세요.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">회사 이름</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="country" className="text-right">국가 코드</Label>
                        <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="예: US, DE, KR" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={isPending}>
                        {isPending ? '추가 중...' : '추가하기'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}