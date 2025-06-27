// src/components/ShowApiKeyDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ShowApiKeyDialogProps {
  open: boolean;
  onClose: () => void;
}

const ShowApiKeyDialog = ({ open, onClose }: ShowApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (open) {
      const storedApiKey = localStorage.getItem("reqlytics_api_key");
      setApiKey(storedApiKey || "No API Key found");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Your API Key</DialogTitle>
          <DialogDescription>
            Use this key to authenticate your API requests securely.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-gray-100 p-4 rounded-md text-sm font-mono break-all select-all">
          {apiKey}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShowApiKeyDialog;
