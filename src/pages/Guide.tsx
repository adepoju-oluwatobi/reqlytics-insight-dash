
import React from "react";
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

const ReqlyticsIntegrationInfo = () => {
    const navigate = useNavigate();
    
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.removeItem('reqlytics_api_key');
        localStorage.removeItem('reqlytics_token');
        navigate('/login');
    };

    const handleShowApiKey = () => {
        // This could be implemented if needed
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
                    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="flex-1 text-center">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                Documentation
                            </h1>
                        </div>
                    </header>
                    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 p-6">
                        <ScrollArea className="h-full w-full">
                            <Card className="max-w-5xl mx-auto border-0 shadow-lg bg-white/90">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-blue-700">
                                        📊 Reqlytics Integration Guide
                                    </CardTitle>
                                    <CardDescription className="text-md text-muted-foreground">
                                        Easily integrate real-time API analytics into your Node.js
                                        (Express) backend
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Installation */}
                                    <div>
                                        <h2 className="text-lg font-semibold mb-2">🔧 Installation</h2>
                                        <CodeBlock language="bash" code={`npm install reqlytics`} />
                                    </div>

                                    {/* ESM Usage */}
                                    <div>
                                        <h2 className="text-lg font-semibold mb-2">🚀 Usage (ESM)</h2>
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

                                    {/* CommonJS Usage */}
                                    <div>
                                        <h2 className="text-lg font-semibold mb-2">📦 Usage (CommonJS)</h2>
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

                                    {/* Config Options */}
                                    <div>
                                        <h2 className="text-lg font-semibold mb-2">
                                            ⚙️ Configuration Options
                                        </h2>
                                        <ul className="list-disc ml-6 text-sm">
                                            <li>
                                                <strong>apiKey</strong>: Your unique API key (get it from the
                                                Reqlytics dashboard).
                                            </li>
                                            <li>
                                                <strong>debug</strong>: Enable console logging (default:{" "}
                                                <code>false</code>).
                                            </li>
                                            <li>
                                                <strong>timeout</strong>: Request timeout in ms (default:{" "}
                                                <code>2000</code>).
                                            </li>
                                            <li>
                                                <strong>endpoint</strong>: Override the default tracking
                                                endpoint (optional).
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Example Response */}
                                    <div>
                                        <h2 className="text-lg font-semibold mb-2">
                                            🧪 Example Tracked Response
                                        </h2>
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

                                    {/* Note */}
                                    <div className="text-sm text-muted-foreground">
                                        <Badge variant="outline">Note</Badge> Make sure to replace{" "}
                                        <code>"YOUR_API_KEY"</code> with your actual key from your
                                        dashboard.
                                    </div>
                                    <Button onClick={() => { navigate('/') }}>
                                        Back to Dashboard
                                    </Button>
                                </CardContent>
                            </Card>
                        </ScrollArea>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

export default ReqlyticsIntegrationInfo;
