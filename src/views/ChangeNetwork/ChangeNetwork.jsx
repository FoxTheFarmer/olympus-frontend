import { Backdrop, Fade, Grid, Link, Paper, SvgIcon, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ReactComponent as XIcon } from "../../assets/icons/x.svg";
import "./changenetwork.scss";
import useEscape from "../../hooks/useEscape";
import Button from "@material-ui/core/Button";
import { useWeb3Context } from "../../hooks/web3Context";
import arbitrum from "../../assets/arbitrum.png";
import ethereum from "../../assets/tokens/wETH.svg";
import React from "react";

function ChangeNetwork() {
  const { switchChain, chainName } = useWeb3Context();
  const history = useHistory();
  const arbitrumId = 42161;
  const ethereumId = 1;

  const handleClose = () => {
    history.goBack();
  };

  const handleSwitchChain = id => {
    return () => {
      switchChain(id);
      handleClose();
    };
  };

  useEscape(() => {
    handleClose();
  });

  return (
    <Fade in={true} mountOnEnter unmountOnExit>
      <Grid container id="change-network-view">
        <Backdrop open={true}>
          <Fade in={true}>
            <Paper className="ohm-card ohm-modal">
              <Grid container className="grid-container">
                <Grid className="grid-header" xs={12}>
                  <Grid>
                    <Link onClick={handleClose}>
                      <SvgIcon color="primary" component={XIcon} />
                    </Link>
                  </Grid>
                  <Grid className="grid-header-title" xs={10}>
                    <Typography variant="h5">Select a Network</Typography>
                  </Grid>
                  <Grid />
                </Grid>

                <Grid className="grid-message">
                  {chainName !== "Unsupported Chain!" ? (
                    <Typography className="grid-message-typography">
                      You are currently on the&nbsp;
                      <Typography className="chain-highlight">{chainName}</Typography>
                      &nbsp;network.
                    </Typography>
                  ) : (
                    <Typography className="grid-message-typography">
                      You are connected to an unsupported network. Please select a network from the list below.
                    </Typography>
                  )}
                </Grid>

                <Grid className="grid-buttons">
                  <Grid className={chainName === "Ethereum" ? "grid-button current" : "grid-button"}>
                    <Button fullWidth fullHeight onClick={handleSwitchChain(ethereumId)}>
                      <Grid className="grid-button-content">
                        <img className="grid-button-icon" src={ethereum} alt="Ethereum Logo" />
                      </Grid>
                      <Grid className="grid-button-content right">
                        <Typography className={chainName === "Ethereum" ? "current" : ""}>Ethereum</Typography>
                      </Grid>
                    </Button>
                  </Grid>

                  <Grid className={chainName === "Arbitrum" ? "grid-button current" : "grid-button"}>
                    <Button fullWidth fullHeight onClick={handleSwitchChain(arbitrumId)}>
                      <Grid className="grid-button-content">
                        <img className="grid-button-icon" src={arbitrum} alt="Arbitrum Logo" />
                      </Grid>
                      <Grid className="grid-button-content grid-button-text">
                        <Typography className={chainName === "Arbitrum" ? "current" : ""}>Arbitrum</Typography>
                      </Grid>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        </Backdrop>
      </Grid>
    </Fade>
  );
}

export default ChangeNetwork;