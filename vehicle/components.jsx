import Inferno from 'inferno';
import Component from 'inferno-component';

export class SubjectDropdown extends Component {
    constructor(props) {
        super(props);
        this.subjects = ["k", "l", "m"];
    }
    render() {
        return (
            <select className="column">{
                this.subjects.map((subject, i) => {
                    return (
                        <option>{ subject }</option>
                    )
                })
            }</select>
        )
    }
}

