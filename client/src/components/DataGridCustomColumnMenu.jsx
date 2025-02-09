const CustomColumnMenu = (props) => {
    const { hideMenu, currentColumn, open } = props;
    return (
      <GridColumnMenu
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        open={open}
      >
        <GridColumnMenuFilterItem onClick={hideMenu} column={currentColumn} />
        <GridColumnMenuColumnsItem onClick={hideMenu} column={currentColumn} />
      </GridColumnMenu>
    );
  };
  
  export default CustomColumnMenu;
  