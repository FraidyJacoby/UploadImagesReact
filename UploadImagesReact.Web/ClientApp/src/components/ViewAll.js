import React from 'react';
import produce from 'immer';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.js';

class ViewAll extends React.Component {

    state = {
        categories: [],
        subcategories: [],
        categoryTitle: '',
        subcategoryTitle: '',
        categorySelected: false,
        images: []
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/categories/getallcategories');
        this.setState({ categories: data });
    }

    onCategorySelect = async category => {
        const { data } = await axios.get(`/api/categories/getsubcategories/${category.id}`);
        const nextState = produce(this.state, draft => {
            draft.subcategories = data;
            draft.categorySelected = true;
            draft.categoryTitle = category.title;
            draft.subcategoryTitle = '';
        })
        this.setState(nextState);
        this.refreshByCategory(category);
    }

    onSubcategorySelect = subcategory => {
        const nextState = produce(this.state, draft => {
            draft.subcategoryTitle = subcategory.title;
        })
        this.setState(nextState);
        this.refreshBySubcategory(subcategory);
    }

    refreshByCategory = async category => {
        const { data } = await axios.get(`/api/uploads/getbycategory/${category.id}`);
        this.setState({ images: data });
    }

    refreshBySubcategory = async subcategory => {
        const { data } = await axios.get(`/api/uploads/getbysubcategory/${subcategory.id}`);
        this.setState({ images: data });
    }

    render() {
        const { onCategorySelect, onSubcategorySelect } = this;
        const { categories, subcategories, categoryTitle, categorySelected, subcategoryTitle, images } = this.state;

        return (
            <>
                <div className="row">
                    <div className="dropdown" style={{ marginBottom: 20, marginRight: 10 }}>
                        <button className="btn btn-info dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            Select a category</button>
                        <div className="dropdown-menu">
                            {categories.map(category =>
                                <button className="dropdown-item" key={category.id}
                                    onClick={() => onCategorySelect(category)}>
                                    {category.title}
                                </button>
                            )}
                        </div>
                    </div>
                    <h4>{categoryTitle}</h4>
                </div>

                {categorySelected &&
                        <div className="row">
                            <div className="dropdown" style={{ marginBottom: 20, marginRight: 10 }}>
                                <button className="btn btn-info dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    Select a subcategory</button>
                                <div className="dropdown-menu">
                                    {subcategories.map(subcategory =>
                                        <button className="dropdown-item" key={subcategory.id}
                                            onClick={() => onSubcategorySelect(subcategory)}>
                                            {subcategory.title}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <h4>{subcategoryTitle}</h4>
                        </div>
                }

                {(images.length === 0 && categorySelected) && <h3 className="text-danger">No images found. Try another search.</h3>}

                {images.map(i =>
                    <div style={{ marginTop: 20 }}>
                        <img key={i.id} src={`/images/getimage?filename=${i.fileName}`} style={{ width: 200 }} />
                        <h6>{i.description}</h6>
                    </div>
                )}
            </>
        )
    }
}

export default ViewAll;