const { ethers } = require('hardhat');

async function main() {
  // Get the deployer's account
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getAddress()).toString());

  // Get the contract factory and deploy the contract
  const UserRegistry = await ethers.getContractFactory('UserRegistry');
  const userRegistry = await UserRegistry.deploy();

  await userRegistry.registerUserToWallet('Marysia Nowak ', 'https://i.ibb.co/svMzq4k/marysia.png', '0x70997970c51812dc3a010c7d01b50e0d17dc79c8');
  await userRegistry.registerUserToWallet('Stefan Broz', 'https://i.ibb.co/441N0qS/stefan.png', '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc');
  await userRegistry.registerUserToWallet('Janusz Adamik', 'https://i.ibb.co/gyyWLsQ/janusz.png', '0x90f79bf6eb2c4f870365e785982e1f101e93b906');

  console.log('UserRegistry contract deployed to:', await userRegistry.getAddress());

  // Deploy PlanetDAO contract
  const PlanetDAO = await ethers.getContractFactory('PlanetDAO');
  const planetDAO = await PlanetDAO.deploy(userRegistry);

  console.log('PlanetDAO', await planetDAO.getAddress());

  // Deploy a community to PlanetDAO
  // const tx = await planetDAO.createCommunity(
  //   'Harvard University',
  //   'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636 as Harvard College and named for its first benefactor, the Puritan clergyman John Harvard, it is the oldest institution of higher learning in the United States. Its influence, wealth, and rankings have made it one of the most prestigious universities in the world.',
  //   '2024-06-15',
  //   'https://cdn.britannica.com/69/141169-050-CD5892EB/Baker-Library-Harvard-Business-School-Boston-University.jpg'
  // );

  // await tx.wait();

  // const ugh = await planetDAO.getCommunities();

  // console.log('UGH', ugh);

  // const community = Community.attach(ugh[0]);

  // console.log('Create ideas');

  // await community.createGoal(
  //   'Interdisciplinary Research Grants',
  //   "The Harvard DAO aims to foster collaboration across various academic disciplines by providing grants for interdisciplinary research projects. This initiative encourages faculty and students from different fields to work together on innovative research that addresses complex global challenges. By leveraging the diverse expertise within Harvard, the DAO seeks to promote groundbreaking discoveries and enhance the university's research output.",
  //   'https://edtochangetheworld.com/wp-content/uploads/2015/09/interdisciplinary-learning.png',
  //   ethers.parseEther('4'),
  //   '2024-07-15'
  // );

  // await community.createGoal(
  //   'Global Outreach Programs',
  //   "The Harvard DAO is committed to extending the university's impact beyond its campus through global outreach programs. This goal focuses on creating partnerships with international institutions, supporting global education initiatives, and implementing projects that address global issues such as public health, climate change, and social inequality. Through these efforts, the DAO aims to enhance Harvard's role as a leader in global education and research, fostering a more interconnected and inclusive world.",
  //   'https://618media.com/wp-content/uploads/2024/01/expand-globally-3-global-outreach-strategies-on-linked-in.webp',
  //   ethers.parseEther('6'),
  //   '2024-07-15'
  // );

  // const firstGoal = Goal.attach((await community.getGoals())[0]);
  // const secondGoal = Goal.attach((await community.getGoals())[1]);

  // console.log('Create goals');

  // await firstGoal.createIdea(
  //   'Create Interdisciplinary Research Teams',
  //   'Establish a structured program within the DAO to form interdisciplinary research teams consisting of faculty and students from diverse fields. The program will include regular workshops, seminars, and collaborative sessions designed to spark innovative ideas and facilitate cross-disciplinary communication. By fostering a collaborative environment, the DAO aims to break down silos between departments and encourage the development of comprehensive research proposals addressing complex issues.',
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStC8BAWjf2cwqnuTOL3a2XYXK66qqZXvFqBQ&s',
  //   ethers.parseEther('1')
  // );

  // await firstGoal.createIdea(
  //   'Fund Interdisciplinary Research Projects',
  //   'Launch a funding initiative specifically for interdisciplinary research projects. The DAO will allocate a significant portion of its resources to provide grants and financial support for research proposals that involve collaboration across multiple academic disciplines. These grants will prioritize projects that demonstrate potential for significant impact and innovation, encouraging researchers to pursue ambitious and transformative ideas.',
  //   'https://honeywell.scene7.com/is/image/honeywell/fluka7?wid=712&hei=475&dpr=off',
  //   ethers.parseEther('5')
  // );

  // await secondGoal.createIdea(
  //   'Establish International Partnerships',
  //   'Develop strategic partnerships with leading international universities, research institutions, and non-governmental organizations. These partnerships will facilitate student and faculty exchange programs, joint research initiatives, and global education projects. By leveraging these collaborations, the DAO aims to enhance the global presence and influence of Harvard, while also contributing to addressing worldwide challenges through shared knowledge and resources.',
  //   'https://s31955.pcdn.co/wp-content/uploads/2019/11/partnership-for-sustainability.jpg',
  //   ethers.parseEther('8')
  // );

  // await secondGoal.createIdea(
  //   'Implement Community-Based Global Projects',
  //   "Initiate and support community-based projects in various regions around the world that address critical issues such as public health, environmental sustainability, and social equity. The DAO will deploy teams of Harvard students and faculty to work directly with local communities, applying their expertise to create sustainable solutions. These projects will not only improve the lives of those in underserved areas but also provide valuable real-world experience for Harvard students, aligning with the university's mission of global impact and community service.",
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubIbjXd07uoc71W8BpgUWp89qmVINN5geJg&s',
  //   ethers.parseEther('5')
  // );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
