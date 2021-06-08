import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import ManageCategories from './components/ManageCategories';

import './custom.css'
import AddSubcategory from './components/AddSubcategory';
import UploadImage from './components/UploadImage';
import ViewAll from './components/ViewAll';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/managecategories' component={ManageCategories} />
                <Route exact path='/addsubcategory/:categoryId' component={AddSubcategory} />
                <Route exact path='/uploadimage' component={UploadImage} />
                <Route exact path='/viewall' component={ViewAll} />
            </Layout>
        );
    }
}
