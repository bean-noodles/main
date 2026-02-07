const getDomainFromLink = (link: string) => {
  const match = link.match(/\/\/([^/]+)\//);
  return match ? match[1] : link;
};

export default getDomainFromLink;
