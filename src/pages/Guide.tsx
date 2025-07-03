
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CodeBlock from "@/components/ui/code-block";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ShowApiKeyDialog from "@/components/ShowApiKeyDialog";

const ReqlyticsIntegrationInfo = () => {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState<boolean>(false);
    
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.removeItem('reqlytics_api_key');
        localStorage.removeItem('reqlytics_token');
        navigate('/login');
    };

    const handleShowApiKey = () => {
        setShowDialog(true);
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full">
                <AppSidebar
                    onShowApiKey={handleShowApiKey}
                    onRefresh={handleRefresh}
                    onLogout={handleLogout}
                />
                <SidebarInset>
                    <header className="sticky top-0 z-50 flex h-12 sm:h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 sm:px-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="flex-1 text-center">
                            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                Documentation
                            </h1>
                        </div>
                    </header>
                    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-6">
                        <ScrollArea className="h-full w-full">
                            <Card className="max-w-5xl mx-auto border-0 shadow-lg bg-white/90">
                                <CardHeader className="p-4 sm:p-6">
                                    <CardTitle className="text-xl sm:text-2xl text-blue-700 break-words">
                                        📊 Reqlytics Integration Guide
                                    </CardTitle>
                                    <CardDescription className="text-sm sm:text-md text-muted-foreground">
                                        Easily integrate real-time API analytics into your Node.js
                                        (Express) backend
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                                    {/* Installation */}
                                    <div>
                                        <h2 className="text-base sm:text-lg font-semibold mb-2">🔧 Installation</h2>
                                        <div className="overflow-x-auto">
                                            <CodeBlock language="bash" code={`npm install reqlytics`} />
                                        </div>
                                    </div>

                                    {/* ESM Usage */}
                                    <div>
                                        <h2 className="text-base sm:text-lg font-semibold mb-2">🚀 Usage (ESM)</h2>
                                        <div className="overflow-x-auto">
                                            <CodeBlock
                                                language="js"
                                                code={`import express from "express";
import { apiAnalytics } from "reqlytics";

const app = express();

app.use(apiAnalytics("YOUR_API_KEY", { debug: true }));

app.get("/hello", (req, res) => {
  res.send("Hello, Reqlytics!");
});

app.listen(3000, () => console.log("Server running on port 3000"));`}
                                            />
                                        </div>
                                    </div>

                                    {/* CommonJS Usage */}
                                    <div>
                                        <h2 className="text-base sm:text-lg font-semibold mb-2">📦 Usage (CommonJS)</h2>
                                        <div className="overflow-x-auto">
                                            <CodeBlock
                                                language="js"
                                                code={`const express = require("express");
const apiAnalytics = require("reqlytics");

const app = express();

app.use(apiAnalytics("YOUR_API_KEY", { debug: true }));

app.get("/hello", (req, res) => {
  res.send("Hello, Reqlytics!");
});

app.listen(3000, () => console.log("Server running on port 3000"));`}
                                            />
                                        </div>
                                    </div>

                                    {/* Config Options */}
                                    <div>
                                        <h2 className="text-base sm:text-lg font-semibold mb-2">
                                            ⚙️ Configuration Options
                                        </h2>
                                        <div className="space-y-2">
                                            <ul className="list-disc ml-4 sm:ml-6 text-sm space-y-1">
                                                <li className="break-words">
                                                    <strong>apiKey</strong>: Your unique API key (get it from the
                                                    Reqlytics dashboard).
                                                </li>
                                                <li className="break-words">
                                                    <strong>debug</strong>: Enable console logging (default:{" "}
                                                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">false</code>).
                                                </li>
                                                <li className="break-words">
                                                    <strong>timeout</strong>: Request timeout in ms (default:{" "}
                                                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">2000</code>).
                                                </li>
                                                <li className="break-words">
                                                    <strong>endpoint</strong>: Override the default tracking
                                                    endpoint (optional).
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Example Response */}
                                    <div>
                                        <h2 className="text-base sm:text-lg font-semibold mb-2">
                                            🧪 Example Tracked Response
                                        </h2>
                                        <div className="overflow-x-auto">
                                            <CodeBlock
                                                language="json"
                                                code={`{
  "endpoint": "/api/data",
  "method": "GET",
  "status_code": 200,
  "response_time": 122
}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Note */}
                                    <div className="text-sm text-muted-foreground break-words">
                                        <Badge variant="outline" className="mb-2">Note</Badge>
                                        <p>
                                            Make sure to replace{" "}
                                            <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">"YOUR_API_KEY"</code> with your actual key from your
                                            dashboard.
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <Button 
                                            onClick={() => { navigate('/') }}
                                            className="w-full sm:w-auto"
                                        >
                                            Back to Dashboard
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollArea>
                    </div>
                </SidebarInset>
            </div>
            <ShowApiKeyDialog open={showDialog} onClose={() => setShowDialog(false)} />
        </SidebarProvider>
    );
};

export default ReqlyticsIntegrationInfo;
