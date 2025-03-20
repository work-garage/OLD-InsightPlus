import { format } from "date-fns";
import { enGB } from "date-fns/locale";

export default function FormattedDate() {
  return (
    <div className="bg-[#0EA6E9] px-4 py-1 rounded-full">
      {format(new Date(), "EEEE dd MMMM yyyy", { locale: enGB })}
    </div>
  );
}
