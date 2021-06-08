import React from 'react';
import axios from 'axios';
import produce from 'immer';

class AddSubcategory extends React.Component {

    state = {
        categoryTitle: '',
        subcategories: [],
        subcategoryTitle: '',
        buttonDisabled: true,
        subcategoryDuplicate: false
    }

    componentDidMount = async () => {
        const { data } = await axios.get(`/api/categories/getcategorytitle/${this.props.match.params.categoryId}`);
        this.setState({ categoryTitle: data });
        await this.refreshSubcategories();
    }

    refreshSubcategories = async () => {
        const { data } = await axios.get(`/api/categories/getsubcategories/${this.props.match.params.categoryId}`);
        this.setState({ subcategories: data });
    }

    onTextChange = async e => {
        const title = e.target.value;

        const nextState = produce(this.state, draft => {
            draft.subcategoryTitle = title;
        })
        this.setState(nextState);

        let buttonStatus = false;

        if (title !== '') {
            this.checkForDuplicate(title);
        }

        if (title === '' || this.state.subcategoryDuplicate) {
            buttonStatus = true;
        }

        this.setButtonStatus(buttonStatus);
    };

    checkForDuplicate = async title => {
        const { data } = await axios.get(`/api/categories/isduplicate/subcategories/${title}`);
        if (data) {
            this.setState({ subcategoryDuplicate: true });
            this.setButtonStatus(true);
        }
        else {
            this.setState({ subcategoryDuplicate: false });
            this.setButtonStatus(false);
        }
    }

    setButtonStatus = status => {
        this.setState({ buttonDisabled: status });
    }

    onAddSubcategoryClick = async () => {
        await axios.post('/api/categories/addsubcategory', {
            categoryId: parseInt(this.props.match.params.categoryId),
            title: this.state.subcategoryTitle
        });
        this.setState({ subcategoryTitle: '' });
        await this.refreshSubcategories();
        this.setButtonStatus(true);
    }

    onRerouteClick = route => {
        this.props.history.push(route);
    }

    render() {
        const { onTextChange, onAddSubcategoryClick, onRerouteClick } = this;
        const { categoryTitle, subcategories, subcategoryTitle, buttonDisabled, subcategoryDuplicate } = this.state;

        return (
            <>
                <button className="btn btn-outline-info" onClick={() => onRerouteClick("/managecategories")}
                    style={{ marginBottom: 20, marginTop:20, marginRight:10 }}>Back to Manage Categories</button>
                <button className="btn btn-outline-danger" onClick={() => onRerouteClick("/")}
                    style={{ marginBottom: 20, marginTop: 20 }}>Back Home</button>
                <h4 className="text-success" style={{ marginBottom: 20 }}>Add subcategory to {categoryTitle}.</h4>
                <input type="text" value={subcategoryTitle} name="subcategoryTitle" style={{ marginBottom: 20 }} 
                    onChange={onTextChange} placeholder="subcategory title" />
                <br />
                <button className="btn btn-primary" onClick={onAddSubcategoryClick} style={{ marginBottom: 30 }} disabled={buttonDisabled}>
                    Add Subcategory to {categoryTitle}</button>
                {subcategoryDuplicate && <h3 className="text-danger">{subcategoryTitle} already exists! Choose a new subcategory.</h3>}
                <ul className="list-group col-md-6" style={{ marginBottom: 10 }}>
                    {subcategories.map((subcategory, i) =>
                        <li key={i} className="list-group-item list-group-item-info">{subcategory.title}</li>
                        )}
                </ul>
            </>
        )
    }
}

export default AddSubcategory;