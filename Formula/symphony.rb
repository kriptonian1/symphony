class Symphony < Formula
  desc "E2E testing made effortless for web"
  homepage "https://github.com/kriptonian1/symphony"
  version "1.2.2"
  license "MIT"
 
  on_macos do
    if Hardware::CPU.intel?
      url "https://github.com/kriptonian1/symphony/releases/download/v1.2.2/symphony-darwin-x64.tar.gz"
      sha256 "3d1e454f3374f0dc58845beea8929a620a9368d929ac602ce0b0edd78ad67800"
    else
      url "https://github.com/kriptonian1/symphony/releases/download/v1.2.2/symphony-darwin-arm64.tar.gz"
      sha256 "cf82ce0e40c87f6dc52dc3a5a3a54a26741e28e74ba17790a58bbf672e40eec6"
    end
  end
 
  def install
    bin.install "symphony"
  end
 
  test do
    system "#{bin}/symphony", "--version"
  end
end
