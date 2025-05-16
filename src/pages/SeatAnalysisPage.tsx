// src/pages/SeatAnalysisPage.tsx
import React, { useState, useMemo } from 'react';
import DataCard from '@/components/common/DataCard'; // Using the same DataCard
import {
  seatAnalysisCardsConfig, SeatAnalysisCardData, getSeatCardValue, mockSeatTableData, SeatTableEntry
} from '@/lib/mockData/seatAnalysisData';
import {
  ExtendedTimePeriod, SEAT_ANALYSIS_CARD_TIME_PERIOD_OPTIONS, TIME_PERIOD_OPTIONS // For general cards
} from '@/lib/mockData/timePeriods';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


const SeatAnalysisPage: React.FC = () => {
  const [noActivityPeriod, setNoActivityPeriod] = useState<ExtendedTimePeriod>('7d');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return mockSeatTableData.slice(startIndex, startIndex + itemsPerPage);
  }, [mockSeatTableData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(mockSeatTableData.length / itemsPerPage);

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8">Seat Analysis</h1>

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {seatAnalysisCardsConfig.map((card: SeatAnalysisCardData) => (
          <DataCard
            key={card.id}
            title={card.title}
            descriptionPrefix={card.description} // Using full description as prefix for simplicity here
            value={card.id === 'noActivity' ? getSeatCardValue(card, noActivityPeriod) : getSeatCardValue(card, '7d' /* dummy for static */)}
            timePeriodOptions={card.id === 'noActivity' ? SEAT_ANALYSIS_CARD_TIME_PERIOD_OPTIONS : TIME_PERIOD_OPTIONS.slice(0,1) /* Dummy for static */}
            selectedPeriod={card.id === 'noActivity' ? noActivityPeriod : '28d' /* Dummy for static */}
            onPeriodChange={card.id === 'noActivity' ? (period) => setNoActivityPeriod(period as ExtendedTimePeriod) : () => {}}
            valueClassName="text-3xl md:text-4xl font-bold"
          />
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
            <CardTitle>Seat Assignment Details</CardTitle>
            <CardDescription>Overview of assigned seats and user activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S. No</TableHead>
                <TableHead>Login</TableHead>
                <TableHead>GitHub ID</TableHead>
                <TableHead>Assigning Team</TableHead>
                <TableHead>Assigned Time</TableHead>
                <TableHead>Last Activity At</TableHead>
                <TableHead>Last Activity Editor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTableData.map((seat: SeatTableEntry) => (
                <TableRow key={seat.id}>
                  <TableCell>{seat.sNo}</TableCell>
                  <TableCell className="font-medium">{seat.login}</TableCell>
                  <TableCell>{seat.githubId}</TableCell>
                  <TableCell>{seat.assigningTeam}</TableCell>
                  <TableCell>{seat.assignedTime}</TableCell>
                  <TableCell>{seat.lastActivityAt}</TableCell>
                  <TableCell>{seat.lastActivityEditor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination Controls */}
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
             <span className="text-sm">
                Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeatAnalysisPage;