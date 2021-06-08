import React from 'react';
import produce from 'immer';
import axios from 'axios';

class ManageCategories extends React.Component {

    state = {
        categories: [],
        categoryTitle: '',
        buttonDisabled: true,
        categoryDuplicate: false
    }

    componentDidMount = async () => {
        await this.refreshCategories();
    }

    onTextChange = async e => {
        const title = e.target.value;

        const nextState = produce(this.state, draft => {
            draft.categoryTitle = title;
        })
        this.setState(nextState);

        let buttonStatus = false;

        if (title !== '') {
            this.checkForDuplicate(title);
        }

        if (title === '' || this.state.categoryDuplicate) {
            buttonStatus = true;
        }

        this.setButtonStatus(buttonStatus);
    }

    checkForDuplicate = async title => {
        const { data } = await axios.get(`/api/categories/isduplicate/categories/${title}`);
        if (data) {
            this.setState({ categoryDuplicate: true });
            this.setButtonStatus(true);
        }
        else {
            this.setState({ categoryDuplicate: false });
            this.setButtonStatus(false);
        }
    }

    setButtonStatus = status => {
        this.setState({ buttonDisabled: status });
    }

    refreshCategories = async () => {
        const { data } = await axios.get('/api/categories/getallcategories');
        this.setState({ categories: data });
    }

    onAddCategoryClick = async () => {
        await axios.post('/api/categories/addcategory', { title: this.state.categoryTitle });
        this.setState({ categoryTitle: '' })
        this.refreshCategories();
        this.setButtonStatus(true);
    }

    onCategoryClick = category => {
        this.props.history.push(`/addsubcategory/${category.id}`);
    }

    render() {
        const { onTextChange, onAddCategoryClick, onCategoryClick } = this;
        const { categoryTitle, buttonDisabled, categoryDuplicate } = this.state;
        return (
            <>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 well">
                        <h4>Enter a new category.</h4>
                        <br />
                        <input type="text" placeholder="category title" name="categoryTitle" className="form-control"
                            value={categoryTitle} onChange={onTextChange} />
                        <br />
                        <button className="btn btn-primary" disabled={buttonDisabled} onClick={onAddCategoryClick}
                            style={{ marginBottom: 20 }}>Add Category</button>
                        {categoryDuplicate && <h3 className="text-danger">{categoryTitle} already exists! Choose a new category.</h3>}
                    </div>
                </div>
                <h4>Click on a category to add a subcategory.</h4>
                <ul className="list-group col-md-6" style={{ marginTop: 10 }}>
                    {this.state.categories.map((category, i) =>
                        <button key={i} className="list-group-item list-group-item-warning" onClick={() => { onCategoryClick(category) }}>{category.title}</button>
                    )}
                </ul>
            </>
        )
    }
}

export default ManageCategories;