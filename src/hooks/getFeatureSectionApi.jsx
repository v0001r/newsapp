import Api from 'src/api/AxiosInterceptors'
import { GET_FEATURE_SECTION_BY_ID } from 'src/utils/api'
import { GET_FEATURE_SECTION } from 'src/utils/api'

export const getFeatureSectionApi = {
  getFeatureSectionById: requestData => {
    const { language_id, offset, limit, slug, latitude, longitude, section_id } = requestData
    return Api.get(GET_FEATURE_SECTION_BY_ID, {
      params: {
        language_id,
        offset,
        limit,
        slug,
        latitude,
        longitude,
        section_id
      }
    })
  },
  getFeatureSection: requestData => {
    const { language_id, offset, limit, slug, latitude, longitude, section_id } = requestData
    return Api.get(GET_FEATURE_SECTION, {
      params: {
        language_id,
        offset,
        limit,
        slug,
        latitude,
        longitude,
        section_id
      }
    })
  }
}
