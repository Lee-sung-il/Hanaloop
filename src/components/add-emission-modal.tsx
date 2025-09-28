'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddEmission } from '@/hooks/useCompany';
import type { GhgEmission } from '@/lib/types';

interface AddEmissionModalProps {
    companyId: string;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function AddEmissionModal({ companyId, isOpen, onOpenChange }: AddEmissionModalProps) {
    //  1. 날짜 상태를 Date 객체로 관리합니다.
    const [month, setMonth] = useState<Date | undefined>();
    const [source, setSource] = useState('');
    //  2. 배출량 상태를 숫자가 아닌 '문자열'로 관리하여 0 문제를 해결합니다.
    const [emissions, setEmissions] = useState('');

    const { mutate: addEmission, isPending } = useAddEmission();

    const handleSubmit = () => {
        // 3. 저장 시점에 날짜를 'YYYY-MM-DD' 형식으로, 배출량을 숫자로 변환합니다.
        if (!month || !source || !emissions) {
            toast.error('모든 필드를 입력해주세요.');
            return;
        }

        const newEmission: GhgEmission = {
            yearMonth: format(month, 'yyyy-MM-dd'),
            source,
            emissions: Number(emissions),
        };

        addEmission({ companyId, newEmission }, {
            onSuccess: () => {
                toast.success('배출량이 추가되었습니다!');
                // 폼 초기화
                setMonth(undefined);
                setSource('');
                setEmissions('');
                onOpenChange(false);
            },
            onError: (error) => toast.error(`오류: ${error.message}`),
        });
    };

    // 4. 숫자 이외의 입력 방지
    const handleEmissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // 숫자만 입력되도록 정규식으로 확인
        if (/^\d*$/.test(value)) {
            setEmissions(value);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>배출량 데이터 추가</DialogTitle>
                    <DialogDescription>새로운 월별 탄소 배출량 데이터를 입력하세요.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* 👇 5. 기존 Input을 Popover와 Calendar로 교체 */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="yearMonth" className="text-right">연도-월</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn("col-span-3 justify-start text-left font-normal", !month && "text-muted-foreground")}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {month ? format(month, "yyyy-MM") : <span>Pick a month</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={month}
                                    onSelect={setMonth}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="source" className="text-right">배출원</Label>
                        <Input id="source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="gasoline, lpg..." className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="emissions" className="text-right">배출량 (톤)</Label>
                        {/*  6. 숫자 입력 Input의 value와 onChange를 수정 */}
                        <Input id="emissions" type="number" value={emissions} onChange={handleEmissionChange} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={isPending}>
                        {isPending ? '저장 중...' : '저장하기'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}