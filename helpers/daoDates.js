import moment from 'moment';

const getRemainingTime = proposal => {
  const { periodDuration, startingPeriod, daoCreationTime, votingPeriodLength } = proposal;
  const timestampConverter = 1000;
  // Move to the start date of current proposal
  const daoCreationDate = new Date(daoCreationTime * timestampConverter);
  daoCreationDate.setSeconds(
    daoCreationDate.getSeconds() + periodDuration * startingPeriod
  );
  const now = moment();
  const votePeriodBegin = moment(daoCreationDate);
  // Time (seconds) from now to the start of current proposal
  const timeDuringVotingPeriod = now.diff(votePeriodBegin, 'seconds');
  // Time (seconds) of the length of the current proposal
  const votingPeriod = (startingPeriod + votingPeriodLength) * periodDuration;
  const remainingTime = votingPeriod - timeDuringVotingPeriod;
  const remainingTimeMoment = moment.duration(remainingTime, 'seconds');
  const minutes = remainingTimeMoment.minutes();
  const hours = remainingTimeMoment.hours();
  const days = remainingTimeMoment.days();

  const formattedTime = `${days} d : ${hours} h : ${minutes} m`;
  return formattedTime;
};

export const parseDate = proposal => {
  const { startingPeriod, currentPeriod, votingPeriodExpired } = proposal;
  const didntStartMessage = 'Not in voting period yet';
  const votingPeriodEndMessage = 'Voting period has finished';

  if (currentPeriod < startingPeriod) return didntStartMessage;
  if (!votingPeriodExpired) return getRemainingTime(proposal);
  return votingPeriodEndMessage;
};
