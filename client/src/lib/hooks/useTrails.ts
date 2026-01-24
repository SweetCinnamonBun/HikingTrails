import { useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent";



export const useTrails = (id?: string) => {

    const queryClient = useQueryClient();

    const { data: trails, isLoading: isLoadingTrails } = useQuery({
        queryKey: ["trails"],
        queryFn: async () => {
            const response = await agent.get("/api/trails")
            return response.data;
        }
    })

    return {
        trails,
        isLoadingTrails
    }
}