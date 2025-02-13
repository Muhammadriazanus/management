import prisma from "@/lib/db";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacher_id: id as string }
        : { class_id: id as number }),
    },
  });

  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.start_time,
    end: lesson.end_time,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
