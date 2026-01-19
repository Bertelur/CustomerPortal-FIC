import { Card, CardContent, CardFooter } from "../../Atoms/Card/card";
import { Skeleton } from "../../Atoms/Skeleton/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card>
      <CardContent className="min-h-80">
        <div className="space-y-3">
          {/* Image */}
          <Skeleton className="h-32 w-full rounded-lg" />

          {/* Title */}
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Price */}
          <Skeleton className="h-5 w-1/2 mt-3" />
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-2">
        {/* Button */}
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
