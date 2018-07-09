import React from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick() {
        this.props.handleDrawerOpen();
    }

    render() {
        return (
            <AppBar
                position="absolute"
                className={classNames(this.props.classes.appBar, this.props.open && this.props.classes.appBarShift)}
            >
                <Toolbar disableGutters={!this.props.open}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleMenuClick}
                        className={classNames(this.props.classes.menuButton, this.props.open && this.props.classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap>
                        営業システム
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default TopBar;
