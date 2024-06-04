import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export default function LoadingSkeleton() {
  return (
    <div className="p-6 pt-3 rounded-lg w-full">
        <Skeleton className="h-3 w-32" />
      <div className="flex items-center pt-4 pb-2">
        <div className="relative flex-1 items-center max-w-[300px]">
          <SearchIcon className="absolute left-2.5 top-2 h-3 w-4 text-gray-500 dark:text-gray-400" />
          <Skeleton className="pl-8 h-8 w-full" />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
      <div className="relative w-full overflow-auto">
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] h-8">
                <Skeleton className="h-3 w-full" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-3 w-full" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-3 w-full" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-3 w-full" />
              </TableHead>
              <TableHead className="w-12 h-10">
                <Skeleton className="h-3 w-full" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="w-12 h-10">
                <Skeleton className="h-3 w-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="w-12 h-10">
                <Skeleton className="h-3 w-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="w-12 h-10">
                <Skeleton className="h-3 w-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="w-12 h-10">
                <Skeleton className="h-3 w-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-b">
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="border-b">
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="border-b">
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="border-b text-right">
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="border-b w-12 h-10">
                <Skeleton className="h-3 w-full" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex mt-4 justify-between">
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-48" />
        </div>
      </div>
    </div>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}