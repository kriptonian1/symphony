class Symphony < Formula
  desc "E2E testing made effortless for web"
  homepage "https://github.com/kriptonian1/symphony"
  version "1.2.0"
  license "MIT"
 
  on_macos do
    if Hardware::CPU.intel?
      url "https://github.com/kriptonian1/symphony/releases/download/v1.2.0/symphony-darwin-x64.tar.gz"
      sha256 "07b35e1932addb2e2d2057c032a12f78a1a9e2f0d83aa40ad0797ea9efd3754e"
    else
      url "https://github.com/kriptonian1/symphony/releases/download/v1.2.0/symphony-darwin-arm64.tar.gz"
      sha256 "8abf40987c5959b6b3de262fcfa36c7e3c063232df5f5ec8e97f3379cc86d802"
    end
  end
 
  def install
    bin.install "symphony"
  end
 
  test do
    system "#{bin}/symphony", "--version"
  end
end
