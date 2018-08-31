import React from "react";
import ReactDOM from "react-dom";

import styles from "./Labeling.scss";

class DropdownItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.callback(this.props.value);
    }

    render() {
        return (
            <li role="presentation">
                <a role="dropdown-item" onClick={this.handleClick}>{this.props.value}</a>
            </li>);
    }
}

class CommentsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleDropdownChoice = this.handleDropdownChoice.bind(this);
    }

    handleDropdownChoice(dropdownValue) {
        this.setState({value: dropdownValue});
    }

    render() {
        let items = this.props.prevComments.map((comment, ind) =>
            <DropdownItem key={ind} value={comment} callback={this.handleDropdownChoice}/>
        );

        return (
            <div>
                <input className="form-control" type="text" name="Comment"
                       autoComplete="off" value={this.state.value}
                       placeholder="Необов'язковий комментар" data-toggle="dropdown" />
                <ul className="dropdown-menu" role="menu">
                    {items}
                </ul>
            </div>);
    }
}

class LabelingApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "TaskId": 1,
            "UttId": 11,
            "Path": "/run10/batch2/5707-jw3r",
            "Cue": "this",
            "SpeakerIdHash": "hash1",
            "SpeakerGender": "Male",
            "SpeakerAge": "30",
            "LabelerLastComments": [
                "comment1",
                "comment2"
            ]
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2">
                        <div className="panel panel-info">
                            <div
                                className="panel-heading">Запис <b>{this.state.UttId}</b> користувача <b>{this.state.SpeakerIdHash}</b> ({this.state.SpeakerGender}, {this.state.SpeakerAge})
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal" action="./post" method="POST">
                                    <input type="hidden" name="TaskId" value={this.state.TaskId} />
                                    <input type="hidden" name="UttId" value={this.state.UttId} />

                                    <div className="form-group">
                                        <div className="text-center">
                                            <audio src={"https://www.robus.io/static/uploads/utterances" + this.state.Path}
                                                   type="audio/mpeg" autoPlay controls>
                                                audio didn't work
                                            </audio>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-lg-3 text-right-lg">
                                            <label>Якість запису</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <label className="radio-inline" data-toggle="tooltip" data-container="body"
                                                   title="Взагалі нічого не розібрати">
                                                <input type="radio" name="RecordingQuality"
                                                       value="1" /> 1
                                            </label>
                                            <label className="radio-inline" data-toggle="tooltip" data-container="body"
                                                   title="Треба дуже вслуховуватись">
                                                <input type="radio" name="RecordingQuality"
                                                       value="2" /> 2
                                            </label>
                                            <label className="radio-inline" data-toggle="tooltip" data-container="body"
                                                   title="Треба вслуховуватись">
                                                <input type="radio" name="RecordingQuality"
                                                       value="3" /> 3
                                            </label>
                                            <label className="radio-inline" data-toggle="tooltip" data-container="body"
                                                   title="Незначні шуми">
                                                <input type="radio" name="RecordingQuality"
                                                       value="4" /> 4
                                            </label>
                                            <label className="radio-inline" data-toggle="tooltip" data-container="body"
                                                   title="Взгалі без шумів">
                                                <input type="radio" name="RecordingQuality"
                                                       value="5" /> 5
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-lg-3 text-right-lg">
                                            <label>Правильність вимови <span className="badge">{this.state.Cue}</span></label>
                                        </div>
                                        <div className="col-lg-9">
                                            <label className="radio-inline" data-toggle="tooltip" data-container="body"
                                                   title="Дуже погана">
                                                <input type="radio" name="PronunciationQuality"  value="1" /> 1
                                            </label>
                                            <label className="radio-inline" data-toggle="tooltip" data-container="body"
                                                   title="Погана">
                                                <input type="radio" name="PronunciationQuality" value="2" /> 2
                                            </label>
                                            <label className="radio-inline" data-toggle="tooltip" data-container="body"
                                                   title="Добра">
                                                <input type="radio" name="PronunciationQuality" value="3" /> 3
                                            </label>
                                            <label className="radio-inline" data-toggle="tooltip" data-container="body"
                                                   title="Дуже хороша">
                                                <input type="radio" name="PronunciationQuality" value="4" /> 4
                                            </label>
                                            <label className="radio-inline" data-toggle="tooltip" data-container="body"
                                                   title="Ідеальна">
                                                <input type="radio" name="PronunciationQuality" value="5" /> 5
                                            </label>
                                            <div className="checkbox">
                                                <label className="radio-inline">
                                                    <input type="radio" name="PronunciationQuality" value="-1" /> неможливо оцінити
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-lg-3 text-right-lg">
                                            <label>Якась типова помилка вимови?</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <div>
                                                <div className="checkbox my-checkbox-inline">
                                                    <label>
                                                        <input type="checkbox" name="Mistakes" value="z_instead_of_theta" />
                                                        /z/ замість /θ/
                                                    </label>
                                                </div>
                                                <div className="checkbox my-checkbox-inline">
                                                    <label>
                                                        <input type="checkbox" name="Mistakes" value="s_instead_of_theta" />
                                                        /s/ замість /θ/
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="checkbox my-checkbox-inline">
                                                    <label>
                                                        <input type="checkbox" name="Mistakes" value="z_instead_of_eth" />
                                                        /z/ замість /ð/
                                                    </label>
                                                </div>
                                                <div className="checkbox my-checkbox-inline">
                                                    <label>
                                                        <input type="checkbox" name="Mistakes" value="s_instead_of_eth" />
                                                        /s/ замість /ð/
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="Mistakes" value="other_not_in_th" />
                                                    Помилка не в ⟨th⟩ (/θ/ або /ð/ звучать ок)
                                                </label>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="Mistakes" value="other" />
                                                    Типова, але жодна з перелічених раніше
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-lg-3 text-right-lg">
                                            <label htmlFor="comment">Коментар</label>
                                        </div>
                                        <div className="col-lg-9">
                                            <CommentsInput prevComments={this.state.LabelerLastComments}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-lg-9 col-lg-offset-3">
                                            <label>
                                                <input type="checkbox" name="IsBookmarked" value="1" />
                                                Помітити запис, щоб його легше було знайти пізніше
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group text-center no-gutter">
                                        <button id="Button_submit" type="submit"
                                                className="btn btn-primary">Відправити
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

ReactDOM.render(
    <LabelingApp/>,
    document.getElementById('app')
);
