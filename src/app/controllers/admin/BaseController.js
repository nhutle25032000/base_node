class BaseController {
  async paginated(pageSize, documentTotal, pageNumber) {
    return {
			pageSize,
			totalItems: documentTotal,
			page: pageNumber,
			totalPages: Math.ceil(documentTotal / pageSize)
		}
  }

  async responseSuccess(data, pageSize, documentTotal, pageNumber) {
    let meta = await this.paginated(pageSize, documentTotal, pageNumber);
  
    return {
      status: 200,
      data: {
				'data': data,
				'meta': meta
			}
    }
  }
}

module.exports = new BaseController();
