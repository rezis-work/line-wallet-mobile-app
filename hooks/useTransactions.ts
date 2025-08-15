import { useCallback, useState } from "react";
import { Alert } from "react-native";

interface Summary {
  balance: number;
  income: number;
  expenses: number;
}

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
}

const API_URL = "https://linewalletapi.onrender.com/api";

export const useTransactions = (userId: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTransactions = useCallback(async () => {
    console.log(
      "fetching transactions from",
      `${API_URL}/transactions/${userId}`
    );
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    console.log(
      "fetching summary from",
      `${API_URL}/transactions/summary/${userId}`
    );
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      loadData();
      Alert.alert("Transaction deleted successfully");
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to delete transaction");
    }
  };

  return {
    transactions,
    summary,
    isLoading,
    deleteTransaction,
    loadData,
  };
};
