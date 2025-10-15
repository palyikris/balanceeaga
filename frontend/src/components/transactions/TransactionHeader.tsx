import { TypingAnimation } from "../magicui/typing-animation";
import { Input } from "../ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface TransactionHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
}

export default function TransactionHeader(props: TransactionHeaderProps) {

  const { search, setSearch } = props;

  return (
    <div className="flex justify-between items-center mt-4">
      <h2 className="font-bold text-limeneon">
        <TypingAnimation style={{ fontSize: "1.5rem" }}>
          Your transactions.
        </TypingAnimation>
      </h2>
      <div className="flex gap-3 items-center">
        <Input
          placeholder="Search description or counterparty"
          className="w-80 bg-graphite-900 border border-offwhite/10 text-offwhite/80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[180px] bg-graphite-900 border border-offwhite/10 text-offwhite/80">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            <SelectItem value="Income">Income</SelectItem>
            <SelectItem value="Groceries">Groceries</SelectItem>
            <SelectItem value="Food & Drinks">Food & Drinks</SelectItem>
            <SelectItem value="Utilities">Utilities</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
            <SelectItem value="Shopping">Shopping</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
    </div>
  );
}