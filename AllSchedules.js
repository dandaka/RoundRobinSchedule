import { ROUNDROBINSCHEDULE } from "./RoundRobinSchedule.js";

function AllSchedules() {
  let allSchedulesOutput = [];
  for (let numTeams = 4; numTeams <= 8; numTeams += 2) {
    const teamsArray = Array.from({ length: numTeams }, (_, i) => `${i + 1}`);
    const schedule = ROUNDROBINSCHEDULE(teamsArray, []);
    const scheduleWithTeamCount = schedule.map(match => [numTeams, ...match]);
    allSchedulesOutput = allSchedulesOutput.concat(scheduleWithTeamCount);
  }
  return allSchedulesOutput;
}

console.log(AllSchedules());