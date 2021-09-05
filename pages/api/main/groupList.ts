import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';
import dotenv from 'dotenv';
import {GroupRecord} from 'types';

dotenv.config();

const BASE_URL = 'https://api.airtable.com/v0/appJ4BvTGzF8kGD3O/group';
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

axios.interceptors.request.use(async (config) => {
  if (!config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${AIRTABLE_API_KEY}`;
  }
  config.headers['Content-Type'] = 'application/json';

  return config;
});

const mainBannerList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const list = await axios.get(BASE_URL, {
      params: {
        view: 'raw',
        filterByFormula: req.query.searchBy ?
          `({${req.query.searchBy}}='${req.query.keyword}')` :
          '',
        maxRecords: req.query.maxRecords,
      },
    });

    const records: GroupRecord[] = list.data.records;
    res.status(200).json({records: records});
  } catch (e) {
    console.log(e.message);
    res.status(500).json({error: true});
  }
};

export default mainBannerList;