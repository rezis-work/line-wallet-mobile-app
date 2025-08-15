import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "@/components/sign-out-button";
import { useTransactions } from "@/hooks/useTransactions";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();
  const { transactions, summary, isLoading, deleteTransaction, loadData } =
    useTransactions(user?.id ?? "");

  console.log("isLoading", user?.id);

  useEffect(() => {
    loadData();
  }, [loadData]);

  console.log("transactions", transactions);
  console.log("summary", summary);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Text>Balance: {summary.balance}</Text>
        <Text>Income: {summary.income}</Text>
        <Text>Expenses: {summary.expenses}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
