// src/pages/ApiResponsePage.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { allMockData } from '@/lib/mockData'; // Import the consolidated data
import { toast } from "sonner";
import { Copy } from 'lucide-react';

const ApiResponsePage: React.FC = () => {
  const handleCopyToClipboard = (data: any, title: string) => {
    try {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      toast.success(`Copied ${title} data to clipboard!`);
    } catch (err) {
      toast.error("Failed to copy data.");
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8">API Response (Mock Data Used)</h1>
      <p className="mb-6 text-muted-foreground">
        This page displays the structure and an example of the mock data used throughout the application.
        The data shown here is typically for the default time period (e.g., '28 days').
        In the actual pages, this data is dynamically adjusted or filtered based on the selected time period.
      </p>

      <div className="space-y-6">
        {Object.entries(allMockData).map(([key, section]) => (
          <Card key={key}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyToClipboard(section.description || section, key)}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy JSON
                </Button>
              </div>
              {section.description && <CardDescription>{section.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm max-h-[500px]">
                {JSON.stringify(section.description || section, null, 2)}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApiResponsePage;