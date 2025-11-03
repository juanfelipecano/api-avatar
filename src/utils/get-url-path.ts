export const getUrlPath = (request: Request) => {
  return `${ request['protocol'] }://${ request.headers['host'] }`;
};
