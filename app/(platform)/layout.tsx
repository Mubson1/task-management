import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => (
  <ClerkProvider>
    <Toaster />
    {children}
  </ClerkProvider>
);

export default PlatformLayout;
