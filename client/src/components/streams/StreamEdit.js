import React from 'react';
import _ from "lodash";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from './StreamForm';

class StreamEdit extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render(){
        // console.log(this.props);
        if (!this.props.stream){
            return <div>Loading...</div>
        }
        console.log(this.props)
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    // initialValues={this.props.stream} //idなど不要な値も含まれる
                    initialValues={_.pick(this.props.stream, 'title', 'description')} //
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

const matStateToProps = (state, ownProps) => {
    // console.log({state});
    // console.log({ownProps});
    return {stream: state.streams[ownProps.match.params.id] }
}

export default connect(matStateToProps, {fetchStream, editStream})(StreamEdit);