import download from 'downloadjs'
import {
    json2csv
} from 'json-2-csv';

export default (context, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    inject('Download', download)
    inject('json2csv', json2csv)
}