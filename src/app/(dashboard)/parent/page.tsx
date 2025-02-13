import { useRouter } from 'next/router';
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import prisma from "@/lib/db";

const ParentPage = async () => {
  const id = context.params.id;
  
  // Assuming you're looking for the first match; using findFirst instead of findMany.
  const classItem = await prisma.class.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  // If classItem is not found, return an error or message
  if (!classItem) {
    return (
      <div>
        <h1>No class found</h1>
      </div>
    );
  }

  console.log("classItem=============?", classItem);

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* Add any other content you want for the left section */}
      </div>

      {/* Big Calendar with classId */}
      <BigCalendarContainer type="classId" id={classItem.id.toString()} />

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
