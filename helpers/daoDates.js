import moment from 'moment';

const getRemainingTime = proposal => {
  // votingPeriods and Duration should come from server or config
  const votingPeriods = 35;
  const periodDuration = 17280;
  const timestampConverter = 1000;

  // Move to the start date of current proposal
  const daoCreationDate = new Date(
    proposal.daoCreationTime * timestampConverter
  );
  daoCreationDate.setSeconds(
    daoCreationDate.getSeconds() + periodDuration * proposal.startingPeriod
  );
  const now = moment();
  const votePeriodBegin = moment(daoCreationDate);
  // Time (seconds) from now to the start of current proposal
  const timeDuringVotingPeriod = now.diff(votePeriodBegin, 'seconds');
  // Time (seconds) of the length of the current proposal
  const votingPeriodLength =
    (proposal.startingPeriod + votingPeriods) * periodDuration;
  const remainingTime = votingPeriodLength - timeDuringVotingPeriod;
  const remainingTimeMoment = moment.duration(remainingTime, 'seconds');
  const minutes = remainingTimeMoment.minutes();
  const hours = remainingTimeMoment.hours();
  const days = remainingTimeMoment.days();

  const formattedTime = `${days} d : ${hours} h : ${minutes} m`;
  return formattedTime;
};

export const parseDate = proposal => {
  const didntStartMessage = 'Not in voting period yet';
  const votingPeriodEndMessage = 'Voting period has finished';
  if (proposal.currentPeriod < proposal.startingPeriod) {
    return didntStartMessage;
  }
  if (!proposal.votingPeriodExpired) {
    return getRemainingTime(proposal);
  }
  return votingPeriodEndMessage;
};
