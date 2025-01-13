import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

const TeacherPage = async() => {

    const classItem = await prisma.class.findMany({
        include: {
            // teacher: true,  // If you want to include the teacher relationship
            students: { select: { id: true, name: true } }, // If you want to include students
            grade: true,
        },
    });


    console.log(classItem);

    // Check if classItem is not empty
    if (!classItem.length) {
        return <div>No classes found.</div>;
    }

    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule (4A)</h1>
                    <BigCalendarContainer type="classId" id={classItem[0]?.id} />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <EventCalendar />
                <Announcements />
            </div>
        </div>
    );
};

export default TeacherPage;