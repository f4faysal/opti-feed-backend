export const hasTimeConflict = (
  existingSlots: {
    startTime: string;
    endTime: string;
    date: string;
  }[],
  newSlot: {
    startTime: string;
    endTime: string;
    date: string;
  }
) => {
  for (const slot of existingSlots) {
    console.log(slot.date);
    console.log(new Date());

    const existingStart = new Date(`${slot.date}T${slot.startTime}:00`);
    const existingEnd = new Date(`${slot.date}T${slot.endTime}:00`);
    const newStart = new Date(`${newSlot.date}T${newSlot.startTime}:00`);
    const newEnd = new Date(`${newSlot.date}T${newSlot.endTime}:00`);

    console.log(existingStart);

    if (newStart < existingEnd && newEnd > existingStart) {
      console.log(true);
      return true;
    }
  }
  console.log(false);

  return false;
};
