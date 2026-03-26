import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from 'react';

// Create a new query client
const queryClient = new QueryClient()

// Define props
type Props = {
    children: ReactNode;
}

export default function QueryProvider({children}: Props) {
    return (
        // Integrate T anstack Query provider to the app
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}