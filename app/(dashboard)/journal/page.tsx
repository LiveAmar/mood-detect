import NewEntryCard from "@/components/NewEntryCard";
import EntryCard from "@/components/entryCard";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import React from "react";

const getEntries = async () => {
  const user = await getUserByClerkID();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();
  return (
    <div className="p-10">
        <h1 className="text-3xl mb-8">Journal</h1>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default JournalPage;