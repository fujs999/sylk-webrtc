'use strict';

const React          = require('react');
const classNames     = require('classnames');

const SettingsBox     = require('./SettingsBox');
const Logo            = require('./Logo');
const ConferenceModal = require('./ConferenceModal')
const config          = require('../config');


let CallBox = React.createClass({
    propTypes: {
        account        : React.PropTypes.object.isRequired,
        callState      : React.PropTypes.string,
        guestMode      : React.PropTypes.bool,
        signOut        : React.PropTypes.func.isRequired,
        startAudioCall : React.PropTypes.func.isRequired,
        startVideoCall : React.PropTypes.func.isRequired,
        targetUri      : React.PropTypes.string
    },

    getInitialState: function() {
        return {
            targetUri: this.props.targetUri,
            conferenceTargetUri: '',
            showConferenceModal: false
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.callState !== 'init') {
            this.setState({
                targetUri: nextProps.targetUri
            });
        }
    },

    getTargetUri: function() {
        let targetUri = this.state.targetUri.replace(/ /g,'_');
        if (targetUri.indexOf('@') === -1) {
            // take the domain part from the account
            const domain = this.props.account.id.substring(this.props.account.id.indexOf('@') + 1);
            targetUri += '@' + domain;
        }
        return targetUri;
    },

    handleTargetChange: function(event) {
        this.setState({targetUri: event.target.value});
    },

    handleConferenceTargetChange: function(event) {
        this.setState({conferenceTargetUri: event.target.value});
    },

    handleAudioCall: function(event) {
        event.preventDefault();
        this.props.startAudioCall(this.getTargetUri());
    },

    handleVideoCall: function(event) {
        event.preventDefault();
        this.props.startVideoCall(this.getTargetUri());
    },

    handleConferenceCall: function(event) {
        event.preventDefault();
        this.setState({showConferenceModal: false});
        let conferenceTargetUri = this.state.conferenceTargetUri.replace(/ /g,'_');
        this.props.startAudioCall(conferenceTargetUri + '@' + config.defaultConferenceDomain);
    },

    showConferenceModal: function(event) {
        event.preventDefault();
        this.setState({showConferenceModal: true, conferenceTargetUri: this.state.targetUri});
    },

    hideConferenceModal: function(event) {
        this.setState({showConferenceModal: false, conferenceTargetUri: ''});
    },

    render: function() {
        let classes = classNames({
            'btn'           : true,
            'btn-round-big' : true,
            'btn-success'   : this.state.targetUri.length !== 0,
            'btn-warning'   : this.state.targetUri.length === 0
        });

        let conferenceModal;
        if (this.state.showConferenceModal) {
            conferenceModal = (
                <ConferenceModal
                    onHide={this.hideConferenceModal}
                    onCall={this.handleConferenceCall}
                    inputChanged={this.handleConferenceTargetChange}
                    targetUri={this.state.targetUri}
                />
            );
        }

        return (
            <div>
                <div className="cover-container">
                    <div className="inner cover">
                        <Logo />
                        <form className="form-dial" name="DialForm">
                            <p className="lead">Enter the address you wish to call</p>
                            <div className="form-group">
                                <input type="text" id="inputDestination" className="form-control input-lg"
                                    onChange={this.handleTargetChange}
                                    value={this.state.targetUri}
                                    disabled={this.props.callState === 'init'}
                                    required autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <button type="button" className={classes} disabled={this.state.targetUri.length === 0 || this.props.callState === 'init'} onClick={this.handleAudioCall}><i className="fa fa-phone"></i></button>
                                <button type="submit" className={classes} disabled={this.state.targetUri.length === 0 || this.props.callState === 'init'} onClick={this.handleVideoCall}><i className="fa fa-video-camera"></i></button>
                                <button type="button" className="btn btn-primary btn-round-big" disabled={this.props.callState === 'init'} onClick={this.showConferenceModal}><i className="fa fa-users"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
                {conferenceModal}
                <SettingsBox account={this.props.account} signOut={this.props.signOut} guestMode={this.props.guestMode}/>
            </div>
        );
    }
});

module.exports = CallBox;
