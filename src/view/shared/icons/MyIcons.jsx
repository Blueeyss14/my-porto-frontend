const MyIcon = ({ color = "black", path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
    <path fill={color} d={path} />
  </svg>
);

export default MyIcon;
