require "shorturl"

class UrlsController < ApplicationController
  def new
    @shortened_url = Url.new
  end

  def create
    shortUrl = ShortURL.shorten(params["url"])
    paramUrl = params["url"];
    @shortened_url = Url.new(url: paramUrl,shortenUrl: shortUrl)
    if @shortened_url.save
      flash[:shortened_id] = @shortened_url.id
      flash[:shortened_url] = @shortened_url.shortenUrl
    end
    render :json => {urlId: @shortened_url.id, shortenedUrl: @shortened_url.shortenUrl}
    # redirect_to new_url_path
  end

  def show
    debugger
    @shortened_url = Url.find(params[:id])
    redirect_to @shortened_url.shortenUrl
  end

end
